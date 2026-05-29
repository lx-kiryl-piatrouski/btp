const express = require('express');
const app = express();

app.use(express.json()); 

app.put('/callback/v1.0/tenants/:tenantId', (req, res) => {
    const tenantId = req.params.tenantId;
    const tenantSubdomain = req.body.subscribedSubdomain;
    
    const tenantAppUrl = `https://${tenantSubdomain}-project2-mycompany.${process.env.DEFAULT_DOMAIN}`;
    
    res.status(200).send(tenantAppUrl);
});

app.delete('/callback/v1.0/tenants/:tenantId', (req, res) => {
    res.status(200).send("Unsubscribed successfully");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`SaaS callback listening on port ${port}`));