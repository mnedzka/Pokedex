const formatName = name => {
    return name ? name.replace(/-+/g, ' ').replace(/\b(\w)/g, m => m.toUpperCase()) : null;
};

export {
    formatName,
}
