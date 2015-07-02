import Chai from 'Chai';
import IntTypeProcessor from '../src/lib/typeProcessors/IntTypeProcessor.js';
const intTypeProcessor = new IntTypeProcessor();
const assert = Chai.assert;

describe('IntTypeProcessor', function() {
    describe('process', function() {

        it('Invalid integer - undefined', function() {
            var result = intTypeProcessor.process(undefined);
            assert.isUndefined(result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Invalid integer - null', function() {
            var result = intTypeProcessor.process(null);
            assert.isUndefined(result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Invalid integer - empty string', function() {
            var result = intTypeProcessor.process('');
            assert.isUndefined(result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Invalid integer - string', function() {
            var result = intTypeProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid integer - string space', function() {
            var result = intTypeProcessor.process(' ');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid integer - float US', function() {
            var result = intTypeProcessor.process('2.3');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Invalid integer - float BR', function() {
            var result = intTypeProcessor.process('2,3');
            assert.isUndefined(result.convertedValue);
            assert.equal('error', result.validationResult);
        });

        it('Valid integer', function() {
            var result = intTypeProcessor.process('2837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid integer zero', function() {
            var result = intTypeProcessor.process('0');
            assert.strictEqual(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid integer padded zero', function() {
            var result = intTypeProcessor.process('0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid integer positive zero', function() {
            var result = intTypeProcessor.process('+0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid integer negative zero', function() {
            var result = intTypeProcessor.process('-0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid positive integer', function() {
            var result = intTypeProcessor.process('+2837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid positive padded integer', function() {
            var result = intTypeProcessor.process('+0002837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid negative integer', function() {
            var result = intTypeProcessor.process('-2837');
            assert.strictEqual(-2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });

        it('Valid negative padded integer', function() {
            var result = intTypeProcessor.process('-0002837');
            assert.strictEqual(-2837, result.convertedValue);
            assert.equal('success', result.validationResult);
        });
    });
});