/**
 * Index Controller
 */

// GET index
exports.index = async (req, res) => {
  const path = req.path;

  // test promise func
  function getData() {
    return new Promise((resolve, reject) => {
      resolve({
        some: 'cool data',
      });
    });
  }

  const data = await getData();

  res.render('index', {
    path,
    title: 'Home',
    data
  });

}
