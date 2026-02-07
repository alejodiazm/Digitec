import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Container = ({ children, className, id, ...props }: ContainerProps) => {
    return (
        <div
            id={id}
            className={cn(
                "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
