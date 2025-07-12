const validateListing = (data) => {
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
  } = data;

  if (!type || !location || !city || !size || !lister || !contact) {
    return "Missing required fields: type, location, city, size, lister, contact";
  }

  if (type === "sale") {
    if (!["lot", "house_and_lot", "condo"].includes(subtype)) {
      return "Invalid";
    }
    if (
      !tcp ||
      !downPaymentPercent ||
      !payableUpToYears ||
      !occupancy ||
      !modeOfPyament
    ) {
      return "Required";
    }
  }

  return null;
};

module.exports = { validateListing };
