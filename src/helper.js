export const getRelativeTime = (createdAtTimestamp) => {
  // Get the current time in milliseconds
  const currentTime = new Date().getTime();

  // Convert createdAt timestamp to milliseconds
  const createdAtMilliseconds = createdAtTimestamp * 1000;

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - createdAtMilliseconds;

  // Calculate days and hours
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Create a string to display the relative time
  let relativeTime;

  if (daysAgo > 0) {
    relativeTime = `${daysAgo}d`;
  } else if (hoursAgo > 0) {
    relativeTime = `${hoursAgo}h`;
  } else if (minutesAgo > 0) {
    relativeTime = `${minutesAgo}m`;
  } else {
    relativeTime = `Just now`;
  }

  return relativeTime;
};