const dataUrl = "https://raw.githubusercontent.com/dnylng/3179/main/Assignment2/data/world-happiness-report-2023.csv";
const baseSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": dataUrl },
    "mark": {
        "type": "point",
        "shape": "circle",  
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
        }
    }
};

let scatterSpecs = [
    { "field": "Social_support", "title": "Social Support" },
    { "field": "Healthy_life_expectancy", "title": "Healthy Life Expectancy" },
    { "field": "GDP_per_capita", "title": "GDP Per Capita" },
    { "field": "Freedom_to_make_life_choices", "title": "Freedom to Make Life Choices" },
    { "field": "Perceptions_of_corruption", "title": "Perceptions of Corruption" }
];

function updateScatterPlot(index) {
    const scatterSpec = JSON.parse(JSON.stringify(baseSpec));
    scatterSpec.encoding.y = {
        "field": scatterSpecs[index].field,
        "type": "quantitative",
        "title": scatterSpecs[index].title
    };
    document.getElementById("scatterTitle").textContent = "Scatterplot: Ladder Score vs. " + scatterSpecs[index].title;
    vegaEmbed("#scatterPlot", scatterSpec, { mode: "vega-lite" }).then(console.log).catch(console.warn);
}

document.getElementById("scatterSlider").addEventListener("input", function() {
    updateScatterPlot(this.value - 1); // Adjusting since array indices start from 0
});

// Initialize the first scatter plot
updateScatterPlot(0);
