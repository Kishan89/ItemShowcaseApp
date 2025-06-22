import { useState, useEffect } from "react";
import styles from "./ViewItems.module.css";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const staticItems = [
      {
        id: "1",
        name: "Premium Blue T-Shirt",
        type: "Shirt",
        description:
          "Ultra-soft premium cotton t-shirt with modern fit. Perfect for casual wear and everyday comfort.",
        coverImage:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        additionalImages: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop",
        ],
      },
      {
        id: "2",
        name: "Professional Running Shoes",
        type: "Shoes",
        description:
          "High-performance running shoes with advanced cushioning technology for maximum comfort and durability.",
        coverImage:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        additionalImages: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        ],
      },
    ];

    const savedItems = localStorage.getItem("items");
    const userItems = savedItems ? JSON.parse(savedItems) : [];
    setItems([...staticItems, ...userItems]);
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      const allImages = [
        selectedItem.coverImage,
        ...(selectedItem.additionalImages || []),
      ];
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      const allImages = [
        selectedItem.coverImage,
        ...(selectedItem.additionalImages || []),
      ];
      setCurrentImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
    }
  };

  const handleEnquire = () => {
    alert(
      `Enquiry sent for ${selectedItem?.name}! We'll get back to you soon.`
    );
    closeModal();
  };

  return (
    <div className={styles.viewItems}>
      <h1 className={styles.headerTitle}>Our Premium Collection</h1>
      <p className={styles.headerDesc}>
        Discover our carefully curated selection of high-quality items
      </p>
      {items.length === 0 ? (
        <div className={styles.noItems}>
          <div className={styles.noItemsBox}>
            <div className={styles.icon}>📦</div>
            <h3>No Items Yet</h3>
            <p>Add some amazing items to get started!</p>
          </div>
        </div>
      ) : (
        <div className={styles.itemGrid}>
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.itemCard}
              onClick={() => openModal(item)}
            >
              <img
                src={item.coverImage}
                alt={item.name}
                className={styles.itemImage}
              />
              <span className={styles.itemType}>{item.type}</span>
              <div className={styles.itemContent}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className={styles.viewDetails}>View Details →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{selectedItem.name}</h2>
              <button onClick={closeModal} className={styles.closeBtn}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <img
                    src={
                      [
                        selectedItem.coverImage,
                        ...selectedItem.additionalImages,
                      ][currentImageIndex]
                    }
                    alt={selectedItem.name}
                  />
                  {selectedItem.additionalImages.length > 0 && (
                    <>
                      <button
                        className={`${styles.navBtn} ${styles.left}`}
                        onClick={prevImage}
                      >
                        ←
                      </button>
                      <button
                        className={`${styles.navBtn} ${styles.right}`}
                        onClick={nextImage}
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
                <div className={styles.thumbnailRow}>
                  {[
                    selectedItem.coverImage,
                    ...selectedItem.additionalImages,
                  ].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      className={`${styles.thumbnail} ${
                        i === currentImageIndex ? styles.active : ""
                      }`}
                      onClick={() => setCurrentImageIndex(i)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.itemDetails}>
                <h4>Item Type</h4>
                <span className={styles.itemLabel}>{selectedItem.type}</span>
                <h4>Description</h4>
                <p>{selectedItem.description}</p>
                <button className={styles.enquireBtn} onClick={handleEnquire}>
                  💬 Enquire About This Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewItems;
