const axios = require('axios');
const cheerio = require('cheerio');

async function checkLinks(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = $('a');
    links.each(async function(i, link) {
        let href = $(link).attr('href');
        if (href === undefined) {
            return;
        }
        try {
            let response = await axios.get(href);
            console.log(`${href} is working fine.`);
        } catch(error) {
            console.log(`${href} is broken.`);
        }
    });
}

checkLinks("https://www.idealimage.com/");