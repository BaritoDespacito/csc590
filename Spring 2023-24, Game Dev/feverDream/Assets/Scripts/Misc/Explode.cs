using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class Explode : MonoBehaviour
{
    // Private variables
    [SerializeField] private float delay = -1.0f;
    [SerializeField] private float radius = 5.0f;
    [SerializeField] private float force = 1500.0f;
    [SerializeField] private float forceModifier = 10.0f;
    [SerializeField] private bool explodeOnCollision = true;
    [SerializeField] private GameObject effectsPrefab;
    [SerializeField] private float effectDisplayTime = 3.0f;
    [SerializeField] private int numOrbs = 10;
    [SerializeField] private GameObject orbPrefab;
    
    private float delayTimer;

    // Unity methods
    private void Awake () {
        delayTimer = 0.0f;
    }

    private void Update () {
        delayTimer += Time.deltaTime;

        if (!(delayTimer >= delay) || explodeOnCollision) return;
        DoExplosion();
        Destroy(gameObject);
    }

    private void OnTriggerEnter (Collider other) {
        // Debug.Log("enemy hit 2");
        if (explodeOnCollision && other.gameObject.CompareTag("Bullet")) {
            DoExplosion();
            // Destroy(gameObject);
        }
    }

    // Helper methods
    private void DoExplosion ()
    {
        float change = 0.0f;
        for (int i = 0; i < numOrbs; i++)
        {
            change += 0.1f;
            if (change > 0.3f)
            {
                change = -0.3f;
            }
            Instantiate(orbPrefab, new Vector3(transform.position.x+change, transform.position.y, transform.position.z + change), Quaternion.identity);
        }
        HandleEffects();
        HandleDestruction();
    }

    private void HandleEffects () {
        if (effectsPrefab != null) {
            GameObject effect = Instantiate(effectsPrefab, transform.position, Quaternion.identity);
            Destroy(effect, effectDisplayTime);
        }
    }

    private void HandleDestruction () {
        Collider[] colliders = Physics.OverlapSphere(transform.position, radius);

        foreach (Collider collider in colliders) {
            Rigidbody rigidbody;
            if (collider.TryGetComponent<Rigidbody>(out rigidbody))
            {
                if (rigidbody != null) {
                    rigidbody.AddExplosionForce(force+Random.value*forceModifier, transform.position, radius);
                }
            }
        }
    }
}
