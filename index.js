const express = require("express");
const listingRoutes = require("./routes/listings");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/listings", listingRoutes);

app.get("/", (req, res) => {
  res.send("Real Estate Listing API");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
