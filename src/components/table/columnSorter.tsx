import { ActionIcon } from "@pankod/refine-mantine";
import { IconChevronDown, IconSelector } from "@tabler/icons";
import { Column } from '@pankod/refine-react-table';

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <ActionIcon
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </ActionIcon>
    );
};