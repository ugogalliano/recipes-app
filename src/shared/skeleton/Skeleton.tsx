interface SkelotonProps {
  className: string;
}

const Skeleton = (props: SkelotonProps) => {
  return (
    <div
      data-testid="skeleton-loader"
      className={`${props.className} bg-gray-300 animate-pulse rounded-md`}
    ></div>
  );
};

export default Skeleton;
