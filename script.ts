import * as dotenv from 'dotenv'
import axios from 'axios';
import fs, { stat } from 'fs';
import { ElectionType, identifiers, states } from './info';
import { ElectionIdentifier } from './types';
import { uppercaseToCamelCase } from './helper';

dotenv.config()

class InecScriptDownloader {
    private readonly service;

    protected basePath = 'Election-Data';
    protected noOfStates = 36;

    constructor() {
        this.service = axios.create({
            baseURL: 'https://ncka74vel8.execute-api.eu-west-2.amazonaws.com/abuja-prod',
        });
    }

    public async download() {
        const result = identifiers.find(v => {
            return v.type === ElectionType.Presidential && v.year === '2023'
        }) as ElectionIdentifier;


        if (!fs.existsSync(this.basePath)) {
            fs.mkdir(this.basePath, (err) => { console.error(err); });
        }

        for(let i = 0; i < states.length; i++) {
            const num = i + 1;

            const response = await this.service.get(`/elections/${result.id}/lga/state/${num}`);

            const info = response.data;

            const folder = `${this.basePath}/${states[i]}`;

            const filePath = `${this.basePath}/${states[i]}/wards.json`;

            if (!fs.existsSync(folder)) fs.mkdir(folder, (err) => { console.error(err); });

            fs.writeFile(filePath, JSON.stringify(info), (err) => {
                if (err) console.error(err);
            });
            console.log(`Downloaded wards for ${states[i]} data`, num);
        }
    }

    public async downloadPollingUnits(selectedState: string) {
        try {
            let info: {path: string; url: string}[] = [];
            const result = identifiers.find(v => {
                return v.type === ElectionType.Presidential && v.year === '2023'
            }) as ElectionIdentifier;
    
                let i = 0;
                const jsonData = fs.readFileSync(`${this.basePath}/${selectedState}/wards.json`, 'utf-8');
    
                const parsedData = JSON.parse(jsonData);
    
                const data = parsedData.data;

                if(!states.includes(selectedState)) {
                    console.error('Unable to find provided state')
                }
    
                data.forEach(async (value: any) => {
                    const stateName = value.state.name;
    
                    const lgName = value.lga.name;
    
                    const wards = value.wards;

                    const folder = `${this.basePath}/${uppercaseToCamelCase(stateName)}/${lgName}`;
                
                    if (!fs.existsSync(folder)) {
                        fs.mkdir(folder, (err) => { console.log(err); });
                    }

                    for (const ward of wards) {
                        i++;
                        const filePath = `${this.basePath}/${uppercaseToCamelCase(stateName)}/${lgName}/${ward.name.replace(/\/|\s/g, "-")}-polling-units.json`;

                        info.push({ path: filePath, url: `/elections/${result.id}/pus?ward=${ward._id}` });
                    }
                });
            for(const i in info) {
                try {
                    const response = await this.service.get(info[i].url);
                
                    fs.writeFile(info[i].path, JSON.stringify(response.data), (err) => {
                        if (err) throw err;
                    });
    
                    console.log(`Downloaded polling units for ${info[i].path} data`);
                } catch (error) {
                    console.log(`Error occurred while fetching data for ${info[i].url}`, error);
                    continue;
                }
            }
            console.log(`${i} wards in ${selectedState}`);
        } catch (error: any) {
            console.log(error);
        }
    }   
}

export default InecScriptDownloader;