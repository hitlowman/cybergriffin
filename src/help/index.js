/*
The MIT License (MIT) 
Copyright (c) <year> <copyright holders>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Stores all help data, that is data that describes the game

*/

export const ICE = {
    name: "ICE",
    description: `Intrusion Countermeasures Electronics (ICE) are used primarily in defense although when used in offense can consume significant defender resourceses`,
    CHILDITEMS: [BLACK_ICE, GREEN_ICE, RED_ICE, BLUE_ICE]
}

export const BLACK_ICE = {
    name: "Black Ice",
    initiative: 64,
    bytes: 1024,
    threads: 1,
    payload: 128,
    exclusive: SYSOP
}

export const GREEN_ICE = {

}

export const RED_ICE = {

}

export const BLUE_ICE = {

}

export const VIRUS = {
    name: "VIRUS",
    title: "VIRUS",
    description: 'Primarily used to infect and take control of nodes, viruses/virii are used primarily in attack although when used in defense are capable of disrupting the reasources of the raider'
}

export const TROJAN = {
    name: "Trojan",
    title: "Trojan",
    initiative: 2,
    bytes: 8,
    threads: 1,
    payload: 32,
    exclusive: HACKER
}

export const SCRIPT = {
    name: "SCRIPT",
    title: "Script",
    description: ``
}

export const COMMAND_AND_CONTROL = {
    name: "Command and control",
    title: "Command and control",
    description: 'This script ...',
    initiative: 64,
    threads: 32,
    exclusive: ENGINEER
}

export const ENGINEER = {
    title: 'Engineer',
    description: 'Woot',
    CHILDITEMS: [COMMAND_AND_CONTROL]
}

export const HACKER = {
    title: 'Hacker',
    description: 'Sysop'
}

export const SYSOP = {
    title: 'Sysop',
    description: 'Teh Sysop'
}



export const ARCHETYPES = {
    title: "Archetypes",
    description: `Various archetypes provide access to various features.  Choose carefully as you cannot change once selected.  ${[ENGINEER,HACKER,SYSOP].map((archetype) => {
            return '\r\n'+archetype.title + ' - ' + archetype.description
        }).join('')}`,
    CHILDITEMS: [ENGINEER, HACKER, SYSOP] 
}

export const CYBERGRIFFIN = {
    title: "Cybergriffin",
    description: `Cybergriffin is an online chat bot based game`,
    CHILDITEMS: [ARCHETYPES]
    
}