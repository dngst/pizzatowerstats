async function drawDashboard() {
  const datasets = {
    save_file_1: {
      file_path: "data/save_file_1.csv"
    },
    save_file_2: {
      file_path: "data/save_file_2.csv"
    }
  }
  let urlParams = new URLSearchParams(window.location.search)
  const defaultDataset = "save_file_1"
  const dataset = datasets[urlParams.get('data') || defaultDataset]
  const loadedData = await d3.csv(dataset.file_path)

  const wrapper = d3.select("#wrapper")

  const section = wrapper.append("section");

  wrapper.append("h4")
        .text(snotty(loadedData[0]))
        .attr("class", "snotty-h4")

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

  function snotty(data) {
    if(data.snotty == 0) {
      return "Snotty Approved"
    }
  }
}

drawDashboard()
