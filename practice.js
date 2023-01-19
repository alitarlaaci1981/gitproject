import fetch from 'node-fetch';

async function checkLinks(url) {
    // Fetch the website's HTML
    const response = await fetch(url);
    const html = await response.text();

    // Create a new DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find all links on the page
    const links = doc.getElementsByTagName("a");

    // Check each link to see if it returns a 404 error
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const linkUrl = link.href;

        // Fetch the link and check the status code
        const linkResponse = await fetch(linkUrl);
        if (linkResponse.status === 404) {
            console.log(`Broken link found: ${linkUrl}`);
        }
    }
}

checkLinks("https://www.idealimage.com/");
