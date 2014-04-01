var imageDir = "/images/country_icons/";
var imageType = ".png";

module.exports = function (country) {
  if (country.length == 2)
    return (imageDir + country.toLowerCase() + imageType);
  else
    return (imageDir + "zz" + imageType);
}
