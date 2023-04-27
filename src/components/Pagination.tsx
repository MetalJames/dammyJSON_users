import { useState, useEffect } from "react";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCurrentPage: (e: any) => void;
    pages: number[] | string,
    currentPage: number,
}

const Pagination = (props: Props) => {

    const { pages, currentPage, setCurrentPage } = props;
    console.log(currentPage);

    const [pagesCurrentlyDisplaying, setPagesCurrentlyDisplaying] = useState<any>([]);

    const initDots = "...";
    const dotsLeft = "... ";
    const dotsRight = " ...";

    useEffect(() => {
        let temporaryDisplaying = [...pages];
        if (currentPage >= 1 && currentPage <= 4) {
            temporaryDisplaying = [1, 2, 3, 4, 5, initDots, pages.length];
        } else if (currentPage === 4) {
            const slicedPages = pages.slice(0, 5);
            temporaryDisplaying = [...slicedPages, dotsRight, pages.length];
        } else if (currentPage > 4 && currentPage < pages.length - 2) {
            const slicedPages1 = pages.slice(currentPage - 2, currentPage);
            const slicedPages2 = pages.slice(currentPage, currentPage + 1);
            temporaryDisplaying = [
            1,
            dotsLeft,
            ...slicedPages1,
            ...slicedPages2,
            dotsRight,
            pages.length,
            ];
        } else if (currentPage > pages.length - 3) {
            const sliced = pages.slice(pages.length - 5);
            temporaryDisplaying = [1, dotsLeft, ...sliced];
        } else if (currentPage.toString() === initDots) {
            setCurrentPage(
            pagesCurrentlyDisplaying[pagesCurrentlyDisplaying.length - 3] + 1
            );
        } else if (currentPage.toString() === dotsRight) {
            setCurrentPage(pagesCurrentlyDisplaying[3] + 2);
        } else if (currentPage.toString() === dotsLeft) {
            setCurrentPage(pagesCurrentlyDisplaying[3] - 2);
        }
        setPagesCurrentlyDisplaying(temporaryDisplaying);
        }, [currentPage, setCurrentPage]);


    return (
        <div className='flex justify-center'>
            {pagesCurrentlyDisplaying.map((page: string, key: number) => (
                <div key={key}
                    className={`${
                        currentPage === Number(page)
                        ? "text-[green] font-semibold"
                        : "text-[black]"
                    } px-4 cursor-pointer w-[40px]`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    )
}

export default Pagination