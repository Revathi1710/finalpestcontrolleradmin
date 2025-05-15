
const url = "https://api.ipstack.com/134.201.250.155?access_key={PASTE_YOUR_API_KEY_HERE}";
const options = {
    method: "GET",
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}