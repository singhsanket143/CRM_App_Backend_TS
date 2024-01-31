export function ticketCreated(id: string) {
    return `
        <h1>Hello, welcome to CRM App </h1>
        <p>Your ticket with id : <strong> ${id} </strong> has been created.</p> <br/>
        <p> You can expect a reply from us soon </p> <br />

        <img src="${"https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif"}" />

        <br />

        <strong>Thanks & regards </strong>
    `
}  