const axios = require("axios");

class MLService {
  constructor() {
    this.baseURL = "http://localhost:8000/api";
  }

  async classifyReport(reportText) {
    try {
      // Call the ML API
      const response = await axios.post(
        `${this.baseURL}/classify`,
        {
          text: reportText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      // Return in the format expected by your createReport function
      return {
        incidentType: response.data.reply || "General",
      };
    } catch (error) {
      console.error("❌ ML Classification error:", error.message);

      // Fallback to local classification if ML API is down
      return this.localClassification(reportText);
    }
  }

  // Fallback local classification (for when ML API is offline)
  localClassification(reportText) {
    const text = reportText.toLowerCase();
    const categories = {
      harassment: [
        "harassment",
        "harass",
        "bully",
        "bullying",
        "tease",
        "verbal",
        "abuse",
        "threaten",
      ],
      domestic_violence: [
        "domestic",
        "family",
        "spouse",
        "husband",
        "wife",
        "partner",
        "marital",
        "home",
        "marriage",
      ],
      sexual_violence: [
        "sexual",
        "rape",
        "assault",
        "molest",
        "molested",
        "abuse",
        "touch",
        "touched",
      ],
      cyber_violence: [
        "cyber",
        "online",
        "internet",
        "social",
        "facebook",
        "whatsapp",
        "message",
        "chat",
        "email",
      ],
      stalking_and_threats: [
        "stalk",
        "stalking",
        "follow",
        "threat",
        "threatening",
        "danger",
        "scare",
        "fear",
      ],
      gender_discrimination: [
        "gender",
        "discrimination",
        "unequal",
        "salary",
        "promotion",
        "women",
        "female",
        "male",
        "discriminate",
      ],
    };

    let detectedCategory = "General";
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(categories)) {
      let score = 0;
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          score++;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        detectedCategory = category;
      }
    }

    return {
      incidentType: detectedCategory,
    };
  }
}

module.exports = new MLService();
