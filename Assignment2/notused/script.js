const dataUrl = "https://raw.githubusercontent.com/dnylng/3179/main/Assignment2/data/world-happiness-report-2023.csv";

const baseSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": dataUrl },
    "width": 390,
    "height": 450,
    "mark": {
        "type": "point",
        "shape": "circle",
        "filled": true,
        "size": 5
    },
    "encoding": {
        "x": {
            "field": "Ladder_score",
            "type": "quantitative",
            "title": "Ladder Score",
            "scale": {
                "domain": [2, 8]
            }
        },
        "color": {
            "field": "region",
            "type": "nominal",
            "title": "Region"
        },
        "size": {
            "field": "Ladder_score",
            "type": "quantitative",
            "scale": {
                "type": "threshold",
                "domain": [3, 4, 5, 6, 7],
                "range": [40, 60, 80, 100, 150, 250]
            },
            "legend": {
                "title": "Ladder Score"
            }
        },
        "tooltip": [
            {"field": "Country_name", "type": "nominal", "title": "Country"},
            {"field": "Ladder_score", "type": "quantitative", "title": "Ladder Score"},
            {"field": "region", "type": "nominal", "title": "Region"}
        ]     
    },
    "transform": [
        {
            "lookup": "Country_name",
            "from": {
                "data": {
                    "url": "https://raw.githubusercontent.com/dnylng/3179/main/Assignment2/data/continents.csv"
                },
                "key": "name",
                "fields": ["region"]
            }
        },
        {
            "filter": {"field": "region", "oneOf": ["Africa", "Americas", "Asia", "Europe", "Oceania"]},
        }
    ]
};

let scatterSpecs = [
    { "field": "Social_support", "title": "Social Support" },
    { "field": "Healthy_life_expectancy", "title": "Healthy Life Expectancy" },
    { "field": "GDP_per_capita", "title": "GDP Per Capita" },
    { "field": "Freedom_to_make_life_choices", "title": "Freedom to Make Life Choices" },
    { "field": "Perceptions_of_corruption", "title": "Perceptions of Corruption" },
    { "field": "Generosity", "title": "Generosity" }
];

function updateScatterPlot(index) {
    const scatterSpec = JSON.parse(JSON.stringify(baseSpec));

    scatterSpec.encoding.y = {
        "field": scatterSpecs[index].field,
        "type": "quantitative",
        "title": scatterSpecs[index].title
    };

    let filterValue = document.getElementById("happinessFilter").value;

    scatterSpec.transform.push({
        "filter": `datum.Ladder_score >= ${filterValue}`
    });

    document.getElementById("scatterTitle").textContent = "Ladder Score (>= " + filterValue + ") vs. " + scatterSpecs[index].title;
    vegaEmbed("#scatterPlot", scatterSpec, { mode: "vega-lite", actions: false}).then(console.log).catch(console.warn);
}

document.getElementById("scatterSlider").addEventListener("input", function() {
    updateScatterPlot(this.value - 1);
});

document.getElementById("happinessFilter").addEventListener("input", function() {
    updateScatterPlot(document.getElementById("scatterSlider").value - 1);
});

updateScatterPlot(0);
