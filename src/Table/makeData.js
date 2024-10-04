import namor from "namor";
import React from 'react'

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        id:  parseInt(Math.random() * (1000 - 10) + 10),
        number:parseInt(Math.random() * (1000 - 10) + 10),
        string:namor.generate({ words: 1, numbers: 0 }),
        boolean:true,
        object:{name:namor.generate({ words: 1, numbers: 0 }),ghosh:"12"},
        array:[namor.generate({ words: 1, numbers: 0 }),namor.generate({ words: 1, numbers: 0 })],
        arrayOfObject: {ajay:namor.generate({ words: 2, numbers: 0 }),name:namor.generate({ words: 2, numbers: 0 })},
        component:<div value={"name"}><h6>hai</h6></div>,
        firstName: {ajay:namor.generate({ words: 2, numbers: 0 }),name:namor.generate({ words: 2, numbers: 0 })},
        lastName: namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33
                    ? "complicated"
                    : "single"

    };
};

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth];
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            };
        });
    };

    return makeDataLevel();
}
