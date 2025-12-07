import React from "react";

export default function ServiceContentTable() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#f8f5fa] backdrop-blur-sm p-8 rounded-2xl border border-[#e5e0eb] shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#2a2a3c]">
          <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">
            सेवा प्रदानकर्ताहरूको सम्पर्क विवरण
          </span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[#e5e0eb]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-[#4a3366]/60 to-[#7c3aed]/30">
                <th className="px-6 py-4 font-semibold text-[#2a2a3c] border-r border-[#e5e0eb] w-20">
                  ना.
                </th>
                <th className="px-6 py-4 font-semibold text-[#2a2a3c] border-r border-[#e5e0eb]">
                  सेवाको प्रकारहरु
                </th>
                <th className="px-6 py-4 font-semibold text-[#2a2a3c] border-r border-[#e5e0eb]">
                  कहाँ सम्पर्क गर्ने
                </th>
                <th className="px-6 py-4 font-semibold text-[#2a2a3c]">
                  कसरी सम्पर्क गर्ने
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  १
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  महिला र बालबालिकाहरु विरुद्ध कुनै पनि हिंसा भएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  राष्ट्रिय महिला आयोग
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  ११४५ / 1145
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200 bg-[#e5e0eb]/20">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  २
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  यदि बालबालिकामाथि कुनै पनि शारीरिक, यौन वा भावनात्मक हिंसा
                  भएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  बाल हेल्प लाइन
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  १०९८ / 1098
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  ३
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  बालबालिका हराएमा तथा भेटिएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  बालबालिका खोजतलास समन्वय केन्द्र
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  १०४ / 104
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200 bg-[#e5e0eb]/20">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  ४
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  मानव तस्करी, मानिस हराएको वा अन्य यौन तथा लैङ्गिक हिंसा भएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  नेपाल प्रहरी
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  १०० / 100
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  ५
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  मनोवैज्ञानिक र मनोसामाजिक सेवाहरु र परामर्श
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  टी.पी.ओ. नेपाल
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  १६६००१०२००५ / 1660 010 2005
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200 bg-[#e5e0eb]/20">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  ६
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  स्वास्थ्य सम्बन्धी जिज्ञासा भएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  स्वास्थ्य तथा जनसङ्ख्या मन्त्रालय
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  १११५ / 1115
                </td>
              </tr>

              <tr className="hover:bg-[#e5e0eb]/50 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-semibold text-[#7c3aed] text-center">
                  ७
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  बाढी र मौसम पूर्वानुमान सम्बन्धी जिज्ञासा भएमा
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] text-[#2a2a3c]">
                  जल तथा मौसम विज्ञान विभाग
                </td>
                <td className="px-6 py-4 border-t border-[#e5e0eb] font-medium text-[#5b21b6]">
                  ११५५ / 1155
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#6b7280] text-sm">
            <span className="text-[#5b21b6] font-medium">Note:</span> These are official
            helpline numbers for Nepal
          </p>
        </div>
      </div>
    </div>
  );
}