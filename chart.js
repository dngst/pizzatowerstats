async function drawDashboard() {
  const datasets = {
    current: {
      file_path: "game_data.csv"
    },
    alt_universe: {
      file_path: "alt_universe.csv"
    }
  }
  let urlParams = new URLSearchParams(window.location.search)
  const defaultDataset = "current"
  const dataset = datasets[urlParams.get('data') || defaultDataset]
  const loadedData = await d3.csv(dataset.file_path)

  const wrapper = d3.select("#wrapper")

  const section = wrapper.append("section");

  function drawMetric(metric) {
    const { key, title, note } = metric;

    const article = section.append("article");
    article.append("h3").text(title);
    article.attr("id", metric.key)

    const value = loadedData[0][metric.key]
    article.append("p").text(value);

    article.append("p").text(note);
  }

  const metrics = [
    {
      key: "percent",
      title: "Progress (%)",
      note: "out of 101%"
    },
    {
      key: "minutes",
      title: "Time (M)",
      note: "Minutes"
    },
    {
      key: "seconds",
      title: "Time (S)",
      note: "Seconds"
    },
  ];

  metrics.forEach((metric) => {
    drawMetric(metric);
  });
}

drawDashboard()
