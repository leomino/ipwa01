import React, {useMemo, useState} from 'react';

export default function DynamicTable({data}) {
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterText, setFilterText] = useState('');

    const filteredData = useMemo(() => {
        if (!filterText) return data;
        return data.filter(item =>
            Object.values(item).some(
                val => val.toString().toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, data]);

    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortKey, sortOrder, filteredData]);

    function handleSort(key) {
        if (key === sortKey && sortOrder === 'desc') {
            setSortKey(null);
            setSortOrder('asc');
            return;
        }

        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    }

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="flex flex-col gap-6">
            <label htmlFor="search" className="hidden">Textsuche nach einem Land oder Unternehmen</label>
            <input type="text" id="search" placeholder="Suche nach einem Land oder Unternehmen..." value={filterText}
                   onChange={e => setFilterText(e.target.value)}
                   className="w-full rounded-xl border-2 border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-light max-w-[48rem]"
            />

            <table className="min-w-full border-none text-left text-sm">
                <thead>
                <tr>
                    {headers.filter(x => x !== 'id').map((header) => (
                        <th
                            key={header}
                            className="px-4 py-2 font-medium"
                            style={{cursor: 'pointer', userSelect: 'none'}}
                            onClick={() => handleSort(header)}
                        >
                            {header}
                            {sortKey === header ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {sortedData.map((row) => (
                    <tr className="odd:bg-gray-50" key={row.id}>
                        {headers.filter(x => x !== 'id').map((header) => (
                            <td className="px-4 py-3" key={header}>{row[header]}</td>
                        ))}
                    </tr>
                ))}

                {sortedData.length === 0 && (
                    <tr key={0} className="odd:bg-gray-50">
                        <td className="px-4 py-3" colSpan={headers.length} style={{textAlign: 'center'}}>
                            Keine Einträge gefunden.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
