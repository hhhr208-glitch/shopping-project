
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchBoxProps {
  initialSearch?: string;
}

export function SearchBox({ initialSearch = '' }: SearchBoxProps) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim()) {
        // If search has text, update URL
        router.push(`/?search=${encodeURIComponent(search.trim())}`);
      } else {
        // If search is empty, go to home page
        router.push('/');
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId); // Cleanup
  }, [search, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products as you type..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
      />
      {/* Optional: Show loading indicator */}
      {search && (
        <p className="text-sm text-gray-500 mt-2">
          Searching for: "{search}"
        </p>
      )}
    </div>
  );
}