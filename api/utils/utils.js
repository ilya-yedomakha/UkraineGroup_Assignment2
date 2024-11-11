function calculateTotalBonus(salesData, socialData) {
    const clientRankings = {
        "excellent": 50,
        "very good": 35,
        "good": 20,
        "average": 10
    };

    let salesBonus = 0;
    for (const sale of salesData) {
        const clientBonus = clientRankings[sale.clientRanking] || 1;
        salesBonus += clientBonus * sale.items;
    }

    let socialBonus = 0;
    socialData.forEach(({ target, actual }) => {
        let relation = actual - target;
        socialBonus += socialBonusCoefficient(relation);
    });

    const totalBonus = salesBonus + socialBonus;
    return { salesBonus, socialBonus, totalBonus };
}

function socialBonusCoefficient(relation) {
        switch (relation) {
            case relation = -2:
                return 10;
            case relation = -1:
                return 20;
            case 0:
                return 50;
            case relation > 0 :
                return 100;
            default:
                return 0
        }
}

const salesData = [
    { client: "Telekom AG", clientRanking: "excellent", items: 20 },
    { client: "Mayer Werft AG", clientRanking: "very good", items: 10 },
    { client: "Germania GmbH", clientRanking: "good", items: 10 },
    { client: "Dirk Müller GmbH", clientRanking: "good", items: 25 },
];

const socialData = [
    { target: 4, actual: 3 },
    { target: 4, actual: 3 },
    { target: 4, actual: 5 },
    { target: 4, actual: 3 },
    { target: 4, actual: 4 },
    { target: 4, actual: 4 },
];

const bonuses = calculateTotalBonus(salesData, socialData);
console.log(bonuses);