import { useState } from "react";
import styles from "./AddItem.module.css";

function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [],
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const itemTypes = [
    "Shirt",
    "Pant",
    "Shoes",
    "Sports Gear",
    "Accessories",
    "Electronics",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    if (
      newImageUrl.trim() &&
      !formData.additionalImages.includes(newImageUrl.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.type ||
      !formData.description.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }
    const newItem = { id: Date.now().toString(), ...formData };
    const existingItems = JSON.parse(localStorage.getItem("items") || "[]");
    localStorage.setItem("items", JSON.stringify([...existingItems, newItem]));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      name: "",
      type: "",
      description: "",
      coverImage: "",
      additionalImages: [],
    });
    setNewImageUrl("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Add New Item</h2>
          <p>Fill in the details below to add a new item to your collection</p>
        </div>

        {showSuccess && (
          <div className={styles.success}>✅ Item successfully added!</div>
        )}

        <div className={styles.formBox}>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Item Name *</label>
            <input
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label className={styles.label}>Item Type *</label>
            <select
              name="type"
              className={styles.select}
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              {itemTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              rows={4}
              className={styles.textarea}
              value={formData.description}
              onChange={handleInputChange}
              required
            />

            <label className={styles.label}>Cover Image URL</label>
            <input
              name="coverImage"
              type="url"
              className={styles.input}
              value={formData.coverImage}
              onChange={handleInputChange}
            />
            {formData.coverImage && (
              <img
                className={styles.previewImage}
                src={formData.coverImage}
                alt="Preview"
              />
            )}

            <label className={styles.label}>Additional Images</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                className={styles.input}
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add image URL"
              />
              <button
                type="button"
                onClick={addImage}
                className={styles.submitBtn}
                style={{ padding: "0.5rem 1rem", width: "auto" }}
              >
                ➕ Add
              </button>
            </div>

            <div className={styles.imageGrid}>
              {formData.additionalImages.map((img, idx) => (
                <div key={idx} className={styles.imageThumb}>
                  <img src={img} alt="Extra" />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeImage(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button type="submit" className={styles.submitBtn}>
              ✨ Add Item to Collection 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
