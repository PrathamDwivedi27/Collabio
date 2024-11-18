import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import qs from 'query-string';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    // Update URL when debouncedValue changes
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: debouncedValue
            },
        }, { skipEmptyString: true, skipNull: true });
        
        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div className="w-full relative">
            <Search
                className="absolute left-3 top-1/2  -translate-y-1/2 transform text-muted-foreground h-4 w-4"
            />
            <Input
                className="w-full max-w-[516px] pl-9"
                placeholder="Search boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};
