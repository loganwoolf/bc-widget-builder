import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';

import { log, messages } from '../../../messages';

import jsonSchema from './jsonSchema';

export default class SchemaValidator {
    readonly schema: any;

    constructor(schema: any) {
        this.schema = schema;
    }

    validate = () => {
        const jsonValidator = new Ajv({
            jsonPointers: true,
        });

        const validator = jsonValidator.compile(jsonSchema);
        const valid = validator(this.schema);

        if (!valid) {
            const output = betterAjvErrors(jsonSchema, this.schema, validator.errors, {
                format: 'js',
            });
            log.error(JSON.stringify(output, null, 2));
        } else {
            log.info(messages.schemaValidated());
        }
    };
}