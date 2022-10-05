const setFakeData = (number) => {
    // console.log(Array.apply(null, Array(number)).map(function (x, i) { return i; }))
    return Array.apply(null, Array(number)).map(function (x, i) { return i; })
}

const setSalary = (type) => {
    const salaryMap = {
        'monthly': '月薪',
        'daily': '日薪',
        'yearly': '年薪',
        'hourly': '時薪'
    }
    return salaryMap[type]
}

// export default {setFakeData, setSalary};
// export default setFakeData;
export {setFakeData, setSalary};