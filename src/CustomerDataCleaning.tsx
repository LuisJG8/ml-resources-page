import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Check } from '@phosphor-icons/react/dist/csr/Check';
import './customer-data-cleaning.css';

interface CustomerRecord {
  id: string;
  age: number | null;
  city: string;
  duplicate?: boolean;
  changedFields?: readonly ('age' | 'city')[];
}

const dirtyCustomers: readonly CustomerRecord[] = [
  { id: 'C101', age: 29, city: 'Boston' },
  { id: 'C101', age: 29, city: 'Boston', duplicate: true },
  { id: 'C102', age: null, city: 'Austin', changedFields: ['age'] },
  { id: 'C103', age: 41, city: 'denver', changedFields: ['city'] },
  { id: 'C105', age: 35, city: 'SEATTLE', changedFields: ['city'] },
];

const cleanCustomers: readonly CustomerRecord[] = [
  { id: 'C101', age: 29, city: 'Boston' },
  { id: 'C102', age: 35, city: 'Austin', changedFields: ['age'] },
  { id: 'C103', age: 41, city: 'Denver', changedFields: ['city'] },
  { id: 'C104', age: 32, city: 'Seattle' },
  { id: 'C105', age: 35, city: 'Seattle', changedFields: ['city'] },
];

function CustomerCell({ record, field, cleaned }: { record: CustomerRecord; field: 'age' | 'city'; cleaned: boolean }) {
  const changed = record.changedFields?.includes(field);
  const value = record[field];
  return <td className={changed ? (cleaned ? 'customer-corrected' : 'customer-issue') : undefined}>
    {value === null ? <span className="customer-null" aria-label="Missing age">NULL</span> : value}
    {cleaned && changed && <><Check weight="bold" aria-hidden="true" /><span className="sr-only"> (corrected)</span></>}
  </td>;
}

function CustomerDataset({ records, cleaned = false }: { records: readonly CustomerRecord[]; cleaned?: boolean }) {
  return <div className={`customer-dataset${cleaned ? ' customer-dataset--cleaned' : ''}`}>
    <table>
      <caption className="sr-only">{cleaned ? 'Cleaned customers' : 'Dirty customers'}</caption>
      <thead><tr><th scope="col">ID</th><th scope="col">Age</th><th scope="col">City</th></tr></thead>
      <tbody>{records.map((record, index) => <tr key={`${record.id}-${index}`} className={record.duplicate ? 'customer-duplicate' : undefined}>
        <td>{record.id}{record.duplicate && <span className="sr-only"> (duplicate)</span>}</td>
        <CustomerCell record={record} field="age" cleaned={cleaned} />
        <CustomerCell record={record} field="city" cleaned={cleaned} />
      </tr>)}</tbody>
    </table>
  </div>;
}

export function CustomerDataCleaning() {
  return <figure className="customer-cleaning" data-reveal="" aria-label="Customer dataset before and after cleaning">
    <div className="customer-cleaning-comparison">
      <CustomerDataset records={dirtyCustomers} />
      <ArrowRight className="customer-cleaning-arrow" weight="light" aria-hidden="true" />
      <CustomerDataset records={cleanCustomers} cleaned />
    </div>
  </figure>;
}
