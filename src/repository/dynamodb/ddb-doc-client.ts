import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, TranslateConfig } from "@aws-sdk/lib-dynamodb";

import { Config } from "../../config/config";

const ddbClient = new DynamoDBClient({ endpoint: Config.DYNAMO_DB_ENDPOINT });

const translateConfig: TranslateConfig = {
    marshallOptions: {
        // Automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false by default.
        // Remove undefined values while marshalling.
        removeUndefinedValues: true, // false by default.
        // Convert typeof object to map attribute.
        convertClassInstanceToMap: false, // false by default.
    },
    unmarshallOptions: {
        // Return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false, // false by default.
    },
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export { ddbDocClient };
