import Sample from '@models/Sample'

test('it should be ok', () => {
  const sample = new Sample()

  sample.message = 'sample testing'

  expect(sample.message).toEqual('sample testing')
})
