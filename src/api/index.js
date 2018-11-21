const getCollectionByKey = async (key, settings) => {
  const url = `/cockpit/api/collections/get/${key}?token=${
    process.env.VUE_APP_COCKPIT_KEY
  }`;
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
  const { entries } = await response.json();
  return entries;
};

const getRegionByKey = key =>
  fetch(
    `/cockpit/api/regions/data/${key}?token=${process.env.VUE_APP_COCKPIT_KEY}`
  )
    .then(response => response.json())
    .then(blob => blob);

export default { getCollectionByKey, getRegionByKey };
