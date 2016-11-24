/*
The MIT License (MIT) 
Copyright (c) <year> <copyright holders>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Exposes database functionality to perform standard operations against the db

*/


export const USER_TEMPLATE = {
    SLACKTRU1234: {
        name: "628426",
        type: "slack",
        archetype: "Engineer",
        nodes: 1000,
        credits: 5000,
        fleets: [
            {
                BI: 42,
                RS: 12,
                coords: "SLACKTRU1234"
            }, {
                BI: 10000,
                FB: 100,
                coords: "SLACKHFJ7895",
                eta: 5,
                etd: 10,
                mission: "Defend"
            },
        ],
        team: "griffithgriffin.slack.com"
    }
}

export const TEAM_TEMPLATE = {
    GRIFFITHGRIFFIN_DOT_SLACK_DOT_COM: {
        name: "griffin",
        joined: "22 Nov 2016",
        type: "slack",
        invited: {
            SLACKTRU1234: true,
            SLACKHFJ895: true
        },
        accepted: {
            SLACKTRU1234: true,
            SLACKHFJ895: true            
        },
        active: {
            SLACKTRU1234: "22 nov 2016",
            SLACKHFJ895: true
        }

    }
}

export function getTeamInfo(id) {
    if (!id) {

    }
}