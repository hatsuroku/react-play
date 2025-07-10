const name1 = "LinDA_Exclude1stModel__MMlayer_BV24_20250709104019_32186a36-dc0d-44e8-971f-30f20218d178";
const name2 = "LinDA_Total__MMlayer_BV24_20250709104019_32186a36-dc0d-44e8-971f-30f20218d178";

const reg = /^[A-Za-z0-9.$\-+%_/]+$/;

const funcs = {
    shit: () => 'shit',
    async ashit() {
        return Promise.resolve('ashit');
    }
}

const getAShit = async () => {
    const { ashit } = funcs;
    const shit = await ashit();
    return shit;
}

getAShit().then(console.log);


