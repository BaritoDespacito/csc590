using System.Collections;
using System.Collections.Generic;
using DefaultNamespace;
using UnityEngine;
using UnityEngine.Serialization;

public class PointOrb : MonoBehaviour
{
    
    public GameObject Player;
    [SerializeField] int MoveSpeed = 4;
    [SerializeField] int NotShootingDist = 5; 
    [SerializeField] int ShootingDist = 1;
    [SerializeField] bool isShooting;
    
    // Start is called before the first frame update
    void Start()
    {
        Player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Player.TryGetComponent<PlayerShoot>(out var playerShoot))
        {
            isShooting = playerShoot.shooting;
        }
        
        transform.LookAt(Player.transform);

        if (isShooting)
        {
            if (Vector3.Distance(transform.position, Player.transform.position) < ShootingDist)
            {
                transform.position += transform.forward * MoveSpeed * Time.deltaTime;
            } 
        }
        else
        {
            if (Vector3.Distance(transform.position, Player.transform.position) < NotShootingDist)
            {
                transform.position += transform.forward * MoveSpeed * Time.deltaTime;
            }
        }
    }
}
