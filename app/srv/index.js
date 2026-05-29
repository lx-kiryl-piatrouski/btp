const express = require('express');
const app = express();

app.use(express.json());

// Коллбэк для активации подписки (когда клиент нажимает "Subscribe")
app.put('/callback/v1.0/tenants/*', (req, res) => {
    // Формируем URL, по которому этот конкретный клиент будет заходить в твое приложение
    // Пример: https://<subdomain>-project2-router.cfapps.eu10.hana.ondemand.com
    const consumerSubdomain = req.body.subscribedSubdomain;
    const appUrl = `https://${consumerSubdomain}-project2-router.${process.env.VCAP_APPLICATION ? JSON.parse(process.env.VCAP_APPLICATION).cf_api.split('api.')[1] : 'cfapps.eu10.hana.ondemand.com'}`;
    
    console.log(`Tenant ${req.params[0]} is subscribing. Returning URL: ${appUrl}`);
    res.status(200).send(appUrl);
});

// Коллбэк для удаления подписки (когда клиент нажимает "Unsubscribe")
app.delete('/callback/v1.0/tenants/*', (req, res) => {
    console.log(`Tenant ${req.params[0]} is unsubscribing.`);
    res.status(200).send("");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Callback server listening on port ${port}`);
});