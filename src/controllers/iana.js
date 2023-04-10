const axios = require('axios');
const { dataConnection } = require('../utils/mongo');
const { activeLogs, messageTelegram, botTelegramConfig} = require("../utils/config");



exports.haveUpdate = async () => {
    const { URL_IANA, COUNTRY_FROM, COUNTRY_TO, TEXT_FROM, TEXT_TO } = process.env;
    try {
        const axiosConfigIANA = {
            url: URL_IANA,
            method: 'get'
        }
        const response = await axios(axiosConfigIANA);
        const ianaText = response.data;
        const dataFromDB = await dataConnection.getOne();

        const ianaTextCountry =
            ianaText.substring(ianaText.indexOf(COUNTRY_FROM),
                ianaText.indexOf(COUNTRY_TO));
        const ianaCountryChanges =
            ianaTextCountry.substring(ianaTextCountry.indexOf(TEXT_FROM),
                ianaTextCountry.indexOf(TEXT_TO));
        const countEntries = (ianaCountryChanges.match(/#/g) || []).length;
        if (countEntries === dataFromDB.counter_entry) {
            const updateData = await dataConnection.update(countEntries, dataFromDB._id);
            if (updateData.modifiedCount === 1) {
                if (activeLogs) console.log('All Right!!!')
                callTelegramBot(messageTelegram);
            }
            if (activeLogs) console.log('Not Update!')
        }

    } catch (ex) {
        if (activeLogs) console.log('Cant update!')
        throw ex;
    }

}

const callTelegramBot = async(message) => {
    try {
        const axiosConfigTelegram = {
            url: `https://api.telegram.org/${botTelegramConfig.botId}:${botTelegramConfig.botToken}/sendMessage`,
            method: 'get',
            params: {
                chat_id: botTelegramConfig.botGroup,
                text: message
            }
        }
        await axios(axiosConfigTelegram);
    } catch (ex) {
        throw ex;
    }
}