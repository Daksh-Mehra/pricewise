"use server"
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice ,extractDescription} from "../utils";


export async function scrapeAmazonProduct(url: string) {
    if(!url){return;}

    //brigthData proxy configuration
    const username=String(process.env.BRIGHTDATA_USERNAME);
    const password=String(process.env.BRIGHTDATA_PASSWORD);
    const port=33335;
    const session_id=(1000000*Math.random()) | 0;
    
    
    
    const options={
        auth:{
            username:`${username}-session-${session_id}`,
            password,
        },
        host:`brd.superproxy.io`,
        port,
        rejectUnauthorized:false,
    };

    try {
        // fetch the product page
        const response=await axios.get(url,options); 

        // console.log(response.data);
        // console.log(response.data.id);

        const $=cheerio.load(response.data);

        // get the product title
        const title=$("#productTitle").text().trim();
        // console.log(title);
        const currentprice=extractPrice(
             $("#corePriceDisplay_desktop_feature_div span.a-price-whole"),
        );
        // console.log(currentprice);

        const originalPrice=extractPrice($("div#corePriceDisplay_desktop_feature_div span.a-price span.a-offscreen"),
        $("#priceblock_ourprice_feature_div span.a-price span.a-offscreen"),
        $("#priceblock_dealprice"));

        // console.log(originalPrice);

        const outOfStock=$("#availability span").text().trim().toLowerCase().includes("out of stock");
        // console.log(outOfStock);

        const images=$("#landingImage").attr("data-a-dynamic-image") || $("#landingImage").attr("src")|| '{}';

        const imageUrls=Object.keys(JSON.parse(images));
        // console.log(imageUrls);

        const currency=extractCurrency($("span .a-price-symbol"));
        // console.log(currency);

        const discountRate=$("span.savingsPercentage").text().replace(/[-%]/g,"");
        // console.log(discountRate);

        const description=extractDescription($);
        // console.log(description);


        //construct the data object
        const data={
            url,
            currency:currency || "$",
            image:imageUrls[0],
            title,
            currentprice:Number(currentprice) || Number(originalPrice),
            originalPrice:Number(originalPrice) || Number(currentprice),
            priceHistory:[],
            discountRate:Number(discountRate),
            category:"category",
            reviewsCount:100,
            stars:4.5,
            isOutOfStock:outOfStock,
            description,
            lowestPrice:Number(currentprice) || Number(originalPrice),
            highestPrice:Number(originalPrice) || Number(currentprice),
            averagePrice:Number(currentprice) || Number(originalPrice),
        }

        return data;
        
    } catch (error:any) {
        throw new Error(`Failed to scrape product:${error.message}`);
        
    }
}

