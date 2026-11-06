const newman = require("newman");

newman.run(
  {
    collection: require("./Dmoney-flow.postman_collection.json"),
    reporters: ["cli", "htmlextra"],
    reporter: {
      htmlextra: {
        export: "./Report/report.html",
      },
    },
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Report created: Report/report.html");
  }
);
