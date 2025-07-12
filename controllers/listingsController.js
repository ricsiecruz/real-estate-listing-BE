const pool = require("../scripts/db");
const { validateListing } = require("../utils/validator");

const createListing = async (req, res) => {
  const error = validateListing(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const {
    type,
    subtype,
    location,
    city,
    size,
    tcp,
    downPaymentPercent,
    payableUpToYears,
    occupancy,
    modeOfPyament,
    lister,
    contact,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO listings (
        type, subtype, house_rooms, condo_type, occupancy, mode_of_payment,
        location, city, size, tcp, downpayment_percent,
        payable_up_to_years, lister, contact
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *`,
      [
        type,
        subtype || null,
        houseRooms || null,
        condoType || null,
        occupancy || null,
        modeOfPayment || null,
        location,
        city,
        size,
        tcp || null,
        downpaymentPercent || null,
        payableUpToYears || null,
        lister,
        contact,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const getListings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM listings ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

module.exports = { createListing, getListings };
