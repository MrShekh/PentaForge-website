import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Irreversible, opaque pixel masks; never CSS blur. Originals are private local files.
const root = process.cwd();
const white = '#e8edf2', dark = '#26303c';
const box = (x,y,w,h,color=white) => ({x,y,w,h,color});
const header = [box(323,17,200,42,dark),box(1590,12,137,48,dark),box(0,865,65,70,'#0d1117'),box(0,897,287,35,'#0d1117')];
const billing = [box(12,829,212,48),box(0,901,239,40),box(1869,460,48,57,'#f4f5f7')];
const jewellery = [box(1710,22,180,47,'#144bec')];
const polishing = [box(8,865,250,58),box(1855,464,62,62)];
export const assets = [
 {group:'Manufacturing ERP',file:'dashboard.png',project:'jewellery-manufacturing',name:'dashboard',masks:[...header,...[405,770,1134,1497].map(x=>box(x,308,205,35,dark)),box(770,350,278,27,dark),box(1134,350,220,27,dark),box(401,534,914,118,dark),box(1695,537,100,110,dark),box(1695,663,100,32,dark)]},
 {group:'Manufacturing ERP',file:'casting balance.png',project:'jewellery-manufacturing',name:'casting',masks:[...header,box(397,258,215,36,dark),box(817,259,248,35,dark)]},
 {group:'Manufacturing ERP',file:'gold recovery.png',project:'jewellery-manufacturing',name:'recovery',masks:header},
 {group:'Manufacturing ERP',file:'purity configuration.png',project:'jewellery-manufacturing',name:'purity',masks:header},
 {group:'Manufacturing ERP',file:'report.png',project:'jewellery-manufacturing',name:'reports',masks:[...header,box(1695,506,116,415,dark),box(397,691,465,176,dark),box(1263,691,226,176,dark)]},
 {group:'Jewellery ERP',file:'dashboard.png',project:'jewellery-operations',name:'dashboard',masks:[...jewellery,...[48,526,1004,1481].map(x=>box(x,304,220,40)),box(48,519,225,43),box(526,519,210,43),box(1003,543,165,43),box(1481,543,170,43),box(1860,457,52,62)]},
 {group:'Jewellery ERP',file:'admin stock.png',project:'jewellery-operations',name:'stock',masks:[...jewellery,box(46,313,220,48),box(46,529,195,40),... [69,675,1280].map(x=>box(x,810,180,66)),box(1843,463,54,64)]},
 {group:'Jewellery ERP',file:'order registery.png',project:'jewellery-operations',name:'production-register',masks:[...jewellery,box(246,300,165,533),box(1160,300,120,533),box(1514,300,139,533),box(1667,300,48,533),box(1845,459,57,65)]},
 {group:'Jewellery ERP',file:'analytics.png',project:'jewellery-operations',name:'analytics',masks:[box(208,118,315,26),... [537,1059,1583].map(x=>box(x,279,120,144)),box(350,844,1354,78),box(1840,452,61,65)]},
 {group:'polishing software',file:'dashboard.png',project:'jewellery-polishing',name:'dashboard',masks:[...polishing,...[330,518,706,894,1133,1323,1510,1700].flatMap(x=>[box(x,176,128,29),box(x,247,128,29)]),... [343,596,845,1150,1400,1650].map(x=>box(x,345,145,31)),box(320,601,223,117),box(767,601,167,117),box(1142,601,148,117),box(1790,601,90,117)]},
 {group:'polishing software',file:'order registery.png',project:'jewellery-polishing',name:'order-registry',masks:[...polishing,box(287,174,150,34),box(485,174,177,34),box(918,174,999,34),box(925,782,992,32),box(620,827,71,28)]},
 {group:'polishing software',file:'customer.png',project:'jewellery-polishing',name:'customer-history',masks:[...polishing,box(307,138,170,34),... [324,590,856,1122,1387,1653].map(x=>box(x,250,152,33)),...[324,590,856,1122,1387].map(x=>box(x,363,152,46)),box(459,532,156,32),box(321,631,357,30),box(801,631,957,30)]},
 {group:'Billing Software',file:'dashboard.png',project:'jewellery-billing',name:'dashboard',masks:billing},
 {group:'Billing Software',file:'bill creating .png',project:'jewellery-billing',name:'create-bill',masks:[...billing,box(1742,179,125,101)]},
 {group:'Billing Software',file:'bill.png',project:'jewellery-billing',name:'bills',masks:[...billing,box(346,279,1280,39)]},
 {group:'Billing Software',file:'advance stock.png',project:'jewellery-billing',name:'advance-stock',masks:[...billing,box(1517,220,165,36)]},
];
const manifest=[];
for (const asset of assets) {
 const source=path.join(root,'.private','screenshots',asset.group,asset.file);
 const metadata=await sharp(source).metadata();
 const masks=asset.masks.map(b=>({...b,w:Math.min(b.w,metadata.width-b.x),h:Math.min(b.h,metadata.height-b.y)})).filter(b=>b.w>0&&b.h>0);
 const svg=Buffer.from(`<svg width="${metadata.width}" height="${metadata.height}">${masks.map(b=>`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="3" fill="${b.color}"/>`).join('')}</svg>`);
 const output=`/projects/${asset.project}/${asset.name}.webp`;
 await fs.mkdir(path.dirname(path.join(root,'public',output)),{recursive:true});
 await sharp(source).composite([{input:svg}]).webp({lossless:true,effort:6}).toFile(path.join(root,'public',output));
 manifest.push({source:`${asset.group}/${asset.file}`,src:output,width:metadata.width,height:metadata.height,bytes:(await fs.stat(path.join(root,'public',output))).size,redacted:true});
}
await fs.mkdir(path.join(root,'data'),{recursive:true});
await fs.writeFile(path.join(root,'data','screenshot-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} redacted, lossless WebP screenshots; ${manifest.reduce((n,a)=>n+a.bytes,0)} bytes total.`);
