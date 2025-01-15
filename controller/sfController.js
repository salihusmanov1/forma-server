
const asyncErrorHandler = require("../utils/asyncErrorHandler")

const createContact = asyncErrorHandler(async (req, res, next) => {
  let accountId = null;
  const checkResult = await checkAccountExists(req.body.name, req.conn);
  if (checkResult.exists) {
    accountId = checkResult.accountId;
  } else {
    const account = await req.conn.sobject('Account').create({ Name: req.body.name });
    accountId = account.id
  }

  const contactData = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Email: req.body.email,
    Phone: req.body.phone,
    Title: req.body.title,
    AccountId: accountId,
  }
  const contact = await req.conn.sobject('Contact').create(contactData);
  res.status(201).json({
    message: 'Contact created successfully',
    contact
  });
})

async function checkAccountExists(accountName, conn) {
  const result = await conn.query(
    `SELECT Id, Name FROM Account WHERE Name = '${accountName}' LIMIT 1`
  );
  if (result.records.length > 0) {
    return { exists: true, accountId: result.records[0].Id };
  } else {
    return { exists: false };
  }
}

module.exports = { createContact }