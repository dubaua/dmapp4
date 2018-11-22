const getCollectionByKey = async (key, settings) => {
  // const url = `/cockpit/api/collections/get/${key}?token=${ process.env.VUE_APP_COCKPIT_KEY }`;
  const url = `/cockpit/api/collections/get/${key}?token=1eb7075408b1a27b01cf4fbeadfc37`;

  // rework code down
  let _settings;
  if (settings) {
    const { limit, skip } = settings;
    _settings = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit,
        skip
        // filter: {published:true},
        // sort: {_created:-1},
        // populate: 1 // resolve linked collection items
      })
    };
  }

  const response = await fetch(url, _settings);
  const blob = await response.json();
  return blob;
};

const getRegionByKey = key =>
  fetch(
    `/cockpit/api/regions/data/${key}?token=${process.env.VUE_APP_COCKPIT_KEY}`
  )
    .then(response => response.json())
    .then(blob => blob);

export default { getCollectionByKey, getRegionByKey };
