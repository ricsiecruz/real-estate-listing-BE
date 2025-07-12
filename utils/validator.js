const validateListing = (data) => {
  const {
    type,
    subtype,
    location,
    city,
    size,
    tcp,
    downpaymentPercent,
    payableUpToYears,
    occupancy,
    modeOfPayment,
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
      !downpaymentPercent ||
      !payableUpToYears ||
      !occupancy ||
      !modeOfPayment
    ) {
      return "Required";
    }
  }

  return null;
};

module.exports = { validateListing };
