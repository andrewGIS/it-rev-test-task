import {formatDistance} from './Table'
test('Check function of format distance', ()=>{
    const inputs = [
        5835,
        0,
        1000,
        1001,
        5830,
        21000
    ]

    const output = [
        "5 километров 835 метров",
        "0 метров",
        "1 километр",
        "1 километр 1 метр",
        "5 километров 830 метров",
        "21 километр"
    ]

    for (let index = 0; index < inputs.length; index++) {
        expect (formatDistance(inputs[index])).toEqual(output[index]);
        
    }
})
