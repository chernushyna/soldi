function formatPrice(price) {
    if (price == null) {
        return '';
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    });

    return formatter.format(price);
}

function extractProductID(pathname) {
    const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

    const match = pathname.match(uuidRegex);

    return match ? match[0] : null;
}

function formatDescription(description) {
    return description.replace(/\./g, '\n\n');
}

function convertImageBinaryData(imageBinaryDataArray) {
    if (!imageBinaryDataArray || imageBinaryDataArray.length === 0) {
        return Promise.resolve([]);
    }

    const dataUrlPromises = imageBinaryDataArray.map((imageBinaryData) => {
        const binaryData = imageBinaryData.data;
        const uint8Array = new Uint8Array(atob(binaryData).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([uint8Array]);
        return URL.createObjectURL(blob);
    });

    return Promise.all(dataUrlPromises);
}




export { formatPrice, extractProductID, formatDescription, convertImageBinaryData };
