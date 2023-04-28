type SearchProps = {
    placeholder: string,
    value: string,
    propFunction: (e: React.FormEvent<HTMLInputElement>) => void,
}

const SearchBar = ({ placeholder, value, propFunction }: SearchProps) => {
    
    return (
        <div>
            <input type="text" placeholder={placeholder} value={value} onChange={propFunction} />
        </div>
    )
}

export default SearchBar