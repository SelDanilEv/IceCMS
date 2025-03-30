"use client";
import { useState, ChangeEvent, useMemo } from 'react';
import styles from './page.module.css';

type ResourceType = 'Text' | 'Image' | 'Script';

export default function ResourceBuilder() {
  const [name, setName] = useState('');
  const [type, setType] = useState<ResourceType>('Text');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{name?: string, file?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const isNameValid = name.startsWith('resource_') && name.length > 'resource_'.length;
    
    if (type === 'Image') {
      return isNameValid && imageFile !== null;
    }
    return isNameValid && textContent.trim() !== '';
  }, [name, type, textContent, imageFile]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleNameFocus = () => {
    if (!name) {
      setName('resource_');
    }
  };

  const handleNameBlur = () => {
    if(name.length <= 'resource_'.length){
        setName('');
      setErrors(prev => ({...prev, name: undefined}));
    }
    else if (!name.startsWith('resource_')) {
      setName(`resource_${name}`);
      setErrors(prev => ({...prev, name: undefined}));
    }
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as ResourceType);
    setTextContent('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (!['jpg', 'png', 'jpeg'].includes(extension || '')) {
        setErrors(prev => ({...prev, file: "Only JPG or PNG files are allowed"}));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      setErrors(prev => ({...prev, file: undefined}));
      setImageFile(file);
    }
  };

  const handleClear = async () => {
    setName('');
    setType('Text');
    setTextContent('');
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const handleSave = async () => {
    if (!isFormValid) {
      alert('Resource not valid');
      return;
    }
  
    setIsLoading(true); 
  
    try {
      const checkResponse = await fetch(`http://localhost:48001/resources`);
      const resources = await checkResponse.json();
  
      if (resources.some((res: any) => res.name === name)) {
        alert('Resource with this name already exists!');
        setIsLoading(false);
        return;
      }
  
      const resourceData = {
        name,
        type,
        value: type === 'Image' ? imagePreview : textContent,
        creater: 1,
      };
  
      const saveResponse = await fetch('http://localhost:48001/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceData),
      });
  
      if (!saveResponse.ok) {
        throw new Error(`Failed to save resource: ${saveResponse.statusText}`);
      }
  
      alert('Resource saved successfully!');
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource');
    } finally {
      setIsLoading(false); 
    }
  };  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Resource Builder</h1>
      </div>
      
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="resource_"
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type" className={styles.label}>Type</label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className={styles.input}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="Script">Script</option>
          </select>
        </div>

        {(type === 'Text' || type === 'Script') && (
          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              {type} Content
            </label>
            <textarea
              id="content"
              value={textContent}
              onChange={handleTextChange}
              rows={6}
              className={`${styles.input} ${styles.textarea}`}
              placeholder={`Enter your ${type.toLowerCase()} here...`}
            />
          </div>
        )}

        {type === 'Image' && (
          <div className={styles.formGroup}>
            <div className={styles.fileUploadContainer}>
              {!imagePreview ? (
                <label className={styles.fileUploadButton}>
                  Choose File
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                </label>
              ) : (
                <label className={styles.imagePreviewContainer}>
                  <div className={styles.imagePreviewWrapper}>
                    <img src={imagePreview} 
                      alt="Preview" 
                      className={styles.imagePreview}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.overlayText}>Click to change image</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                </label>
              )}
              {errors.file && <p className={styles.errorText}>{errors.file}</p>}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button
            onClick={handleClear}
            className={`${styles.button} ${styles.clearButton}`}
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.saveButton} ${!isFormValid ? styles.disabledButton : ''}`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span> 
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}